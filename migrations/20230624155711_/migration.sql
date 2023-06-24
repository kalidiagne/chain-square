-- CreateTable
CREATE TABLE "Scores" (
    "id" SERIAL NOT NULL,
    "userAddress" TEXT NOT NULL,
    "criterion" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Scores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Scores_userAddress_idx" ON "Scores"("userAddress");

-- CreateIndex
CREATE INDEX "Scores_criterion_idx" ON "Scores"("criterion");

-- CreateIndex
CREATE INDEX "Scores_score_idx" ON "Scores"("score");

-- CreateIndex
CREATE UNIQUE INDEX "Scores_criterion_userAddress_key" ON "Scores"("criterion", "userAddress");
