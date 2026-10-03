import { relations } from "drizzle-orm";
import {
  users,
  companies,
  applications,
  recruiters,
  applicationRecruiters,
  followups,
  interviews,
  notes,
  applicationEvents,
  notifications,
} from "./schema";

export const usersRelations = relations(users, ({ many }) => ({
  companies: many(companies),
  applications: many(applications),
  recruiters: many(recruiters),
  notifications: many(notifications),
}));

export const companiesRelations = relations(companies, ({ one, many }) => ({
  user: one(users, {
    fields: [companies.userId],
    references: [users.id],
  }),
  applications: many(applications),
  recruiters: many(recruiters),
}));

export const applicationsRelations = relations(
  applications,
  ({ one, many }) => ({
    user: one(users, {
      fields: [applications.userId],
      references: [users.id],
    }),
    company: one(companies, {
      fields: [applications.companyId],
      references: [companies.id],
    }),
    followups: many(followups),
    interviews: many(interviews),
    notes: many(notes),
    applicationEvents: many(applicationEvents),
    applicationRecruiters: many(applicationRecruiters),
    notifications: many(notifications),
  })
);

export const recruitersRelations = relations(recruiters, ({ one, many }) => ({
  user: one(users, {
    fields: [recruiters.userId],
    references: [users.id],
  }),
  company: one(companies, {
    fields: [recruiters.companyId],
    references: [companies.id],
  }),
  applicationRecruiters: many(applicationRecruiters),
}));

export const applicationRecruitersRelations = relations(
  applicationRecruiters,
  ({ one }) => ({
    application: one(applications, {
      fields: [applicationRecruiters.applicationId],
      references: [applications.id],
    }),
    recruiter: one(recruiters, {
      fields: [applicationRecruiters.recruiterId],
      references: [recruiters.id],
    }),
  })
);

export const followupsRelations = relations(followups, ({ one }) => ({
  application: one(applications, {
    fields: [followups.applicationId],
    references: [applications.id],
  }),
}));

export const interviewsRelations = relations(interviews, ({ one }) => ({
  application: one(applications, {
    fields: [interviews.applicationId],
    references: [applications.id],
  }),
}));

export const notesRelations = relations(notes, ({ one }) => ({
  application: one(applications, {
    fields: [notes.applicationId],
    references: [applications.id],
  }),
}));

export const applicationEventsRelations = relations(
  applicationEvents,
  ({ one }) => ({
    application: one(applications, {
      fields: [applicationEvents.applicationId],
      references: [applications.id],
    }),
  })
);

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
  application: one(applications, {
    fields: [notifications.applicationId],
    references: [applications.id],
  }),
}));
