-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "messsage" TEXT NOT NULL,
    "senderEmail" TEXT,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_senderEmail_fkey" FOREIGN KEY ("senderEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
