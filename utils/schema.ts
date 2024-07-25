import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview=pgTable('mockInterview', {
    id:serial('id').primaryKey(),
    jsonMockResp:text('jsonMockResp').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt').notNull(),
    mockId:varchar('mockId').notNull()
})

export const UserAnswer = pgTable('userAnswer', {
    id: serial('id').primaryKey(),
    mockIdRef:varchar('mockId').notNull(),
    question: varchar('question').notNull(),
    userAnswer: varchar('userAnswer').notNull(),
    feedback: varchar('feedback').notNull(),
    createdAt: varchar('createdAt').notNull(),
    rating: serial('rating').notNull(),
    userEmail: varchar('userEmail').notNull(),
    correctAnswer: varchar('correctAnswer').notNull()
});
