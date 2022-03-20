/*
  Warnings:

  - A unique constraint covering the columns `[product_id]` on the table `nutritions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `products_likes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `product_id`(`product_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `nutritions_product_id_key` ON `nutritions`(`product_id`);

-- AddForeignKey
ALTER TABLE `products_likes` ADD CONSTRAINT `products_likes_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products_likes` ADD CONSTRAINT `products_likes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
