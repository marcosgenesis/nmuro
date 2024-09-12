CREATE TABLE IF NOT EXISTS "praises" (
	"id" text PRIMARY KEY NOT NULL,
	"person" integer NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
