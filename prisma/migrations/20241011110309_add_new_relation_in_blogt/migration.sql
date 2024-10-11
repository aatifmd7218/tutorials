-- AddForeignKey
ALTER TABLE "Blogt" ADD CONSTRAINT "Blogt_bloglive_id_fkey" FOREIGN KEY ("bloglive_id") REFERENCES "Bloglivet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
