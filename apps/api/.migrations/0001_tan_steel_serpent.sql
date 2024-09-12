ALTER TABLE "praises" RENAME COLUMN "person" TO "person_id";--> statement-breakpoint
ALTER TABLE "praises" ALTER COLUMN "person_id" SET DATA TYPE text;