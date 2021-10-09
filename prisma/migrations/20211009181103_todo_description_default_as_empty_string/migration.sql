-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "active" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "description" SET DEFAULT E'';
