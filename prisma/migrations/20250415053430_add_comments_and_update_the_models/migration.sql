/*
  Warnings:

  - You are about to drop the column `name` on the `exercise_log` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "exercise_log" DROP COLUMN "name";

-- AlterTable
ALTER TABLE "exercise_time" ALTER COLUMN "repeat" SET DEFAULT 0,
ALTER COLUMN "weight" SET DEFAULT 0;
