import {
  pgTable,
  uuid,
  varchar,
  text,
  numeric,
  integer,
  timestamp,
  jsonb,
  pgEnum,
  index,
  primaryKey,
} from "drizzle-orm/pg-core";

// ============================================================================
// ENUMS
// ============================================================================

export const applicationSourceEnum = pgEnum("application_source", [
  "LINKEDIN",
  "NAUKRI",
  "CAREER_PAGE",
  "HR_DM",
  "REFERRAL",
  "OTHER",
]);

export const applicationStatusEnum = pgEnum("application_status", [
  "SAVED",
  "APPLIED",
  "HR_CONTACTED",
  "HR_REPLIED",
  "INTERVIEW",
  "TECHNICAL_ROUND",
  "HR_ROUND",
  "OFFER",
  "REJECTED",
  "WITHDRAWN",
  "NO_RESPONSE",
]);

export const followupStatusEnum = pgEnum("followup_status", [
  "PENDING",
  "COMPLETED",
  "CANCELLED",
]);

export const followupTypeEnum = pgEnum("followup_type", [
  "APPLICATION",
  "HR_CONTACT",
  "POST_INTERVIEW",
  "CUSTOM",
]);

export const interviewRoundEnum = pgEnum("interview_round", [
  "SCREENING",
  "TECHNICAL",
  "HR",
  "FINAL",
  "OTHER",
]);

export const interviewTypeEnum = pgEnum("interview_type", [
  "VIDEO",
  "PHONE",
  "ONSITE",
  "OTHER",
]);

export const interviewStatusEnum = pgEnum("interview_status", [
  "SCHEDULED",
  "COMPLETED",
  "CANCELLED",
  "NO_SHOW",
]);

export const applicationEventTypeEnum = pgEnum("application_event_type", [
  "APPLICATION_CREATED",
  "STATUS_CHANGED",
  "HR_CONTACTED",
  "HR_REPLIED",
  "FOLLOWUP_CREATED",
  "FOLLOWUP_COMPLETED",
  "INTERVIEW_SCHEDULED",
  "INTERVIEW_COMPLETED",
  "NOTE_ADDED",
  "RECRUITER_ADDED",
  "OFFER_RECEIVED",
  "APPLICATION_REJECTED",
  "APPLICATION_WITHDRAWN",
]);

export const notificationTypeEnum = pgEnum("notification_type", [
  "FOLLOWUP_DUE",
  "INTERVIEW_REMINDER",
  "SYSTEM",
]);

// ============================================================================
// TABLES
// ============================================================================

/**
 * Users: Application owners / future authentication identity.
 */
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/**
 * Companies: Organizations targeted by applications or linked to recruiters.
 */
export const companies = pgTable(
  "companies",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    website: text("website"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("companies_user_id_idx").on(table.userId)]
);

/**
 * Applications: Core job application tracking records.
 */
export const applications = pgTable(
  "applications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    companyId: uuid("company_id").references(() => companies.id, {
      onDelete: "set null",
    }),
    jobTitle: varchar("job_title", { length: 255 }).notNull(),
    source: applicationSourceEnum("source").notNull(),
    status: applicationStatusEnum("status").default("SAVED").notNull(),
    jobUrl: text("job_url"),
    location: varchar("location", { length: 255 }),
    employmentType: varchar("employment_type", { length: 100 }),
    description: text("description"),
    salaryMin: numeric("salary_min", { precision: 12, scale: 2 }),
    salaryMax: numeric("salary_max", { precision: 12, scale: 2 }),
    salaryCurrency: varchar("salary_currency", { length: 10 }),
    appliedAt: timestamp("applied_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("applications_user_id_status_idx").on(table.userId, table.status),
    index("applications_company_id_idx").on(table.companyId),
  ]
);

/**
 * Recruiters: Contacts and talent partners associated with companies or applications.
 */
export const recruiters = pgTable(
  "recruiters",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    companyId: uuid("company_id").references(() => companies.id, {
      onDelete: "set null",
    }),
    name: varchar("name", { length: 255 }).notNull(),
    jobTitle: varchar("job_title", { length: 255 }),
    email: varchar("email", { length: 255 }),
    linkedinUrl: text("linkedin_url"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("recruiters_user_id_idx").on(table.userId),
    index("recruiters_company_id_idx").on(table.companyId),
  ]
);

/**
 * Application Recruiters: Join table linking applications and recruiters (many-to-many).
 */
export const applicationRecruiters = pgTable(
  "application_recruiters",
  {
    applicationId: uuid("application_id")
      .notNull()
      .references(() => applications.id, { onDelete: "cascade" }),
    recruiterId: uuid("recruiter_id")
      .notNull()
      .references(() => recruiters.id, { onDelete: "cascade" }),
  },
  (table) => [
    primaryKey({ columns: [table.applicationId, table.recruiterId] }),
    index("app_recruiters_recruiter_id_idx").on(table.recruiterId),
  ]
);

/**
 * Followups: Scheduled and completed follow-up reminders for applications.
 */
export const followups = pgTable(
  "followups",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    applicationId: uuid("application_id")
      .notNull()
      .references(() => applications.id, { onDelete: "cascade" }),
    type: followupTypeEnum("type").notNull(),
    status: followupStatusEnum("status").default("PENDING").notNull(),
    scheduledAt: timestamp("scheduled_at", { withTimezone: true }).notNull(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
    notifiedAt: timestamp("notified_at", { withTimezone: true }),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("followups_application_id_idx").on(table.applicationId),
    index("followups_status_scheduled_at_idx").on(
      table.status,
      table.scheduledAt
    ),
  ]
);

/**
 * Interviews: Scheduled rounds, interview types, and outcomes.
 */
export const interviews = pgTable(
  "interviews",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    applicationId: uuid("application_id")
      .notNull()
      .references(() => applications.id, { onDelete: "cascade" }),
    round: interviewRoundEnum("round").notNull(),
    interviewType: interviewTypeEnum("interview_type").notNull(),
    status: interviewStatusEnum("status").default("SCHEDULED").notNull(),
    scheduledAt: timestamp("scheduled_at", { withTimezone: true }).notNull(),
    durationMinutes: integer("duration_minutes"),
    meetingUrl: text("meeting_url"),
    interviewerName: varchar("interviewer_name", { length: 255 }),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("interviews_application_id_scheduled_at_idx").on(
      table.applicationId,
      table.scheduledAt
    ),
    index("interviews_status_idx").on(table.status),
  ]
);

/**
 * Notes: Free-form user notes attached to applications.
 */
export const notes = pgTable(
  "notes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    applicationId: uuid("application_id")
      .notNull()
      .references(() => applications.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("notes_application_id_idx").on(table.applicationId)]
);

/**
 * Application Events: Permanent chronological audit log / timeline of application milestones.
 */
export const applicationEvents = pgTable(
  "application_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    applicationId: uuid("application_id")
      .notNull()
      .references(() => applications.id, { onDelete: "cascade" }),
    eventType: applicationEventTypeEnum("event_type").notNull(),
    description: text("description"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("app_events_app_id_created_at_idx").on(
      table.applicationId,
      table.createdAt
    ),
  ]
);

/**
 * Notifications: User-targeted alert notifications for followups, interviews, and system events.
 */
export const notifications = pgTable(
  "notifications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    applicationId: uuid("application_id").references(() => applications.id, {
      onDelete: "cascade",
    }),
    type: notificationTypeEnum("type").notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    message: text("message").notNull(),
    readAt: timestamp("read_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("notifications_user_id_idx").on(table.userId),
    index("notifications_user_id_read_at_idx").on(table.userId, table.readAt),
  ]
);
