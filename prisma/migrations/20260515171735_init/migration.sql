-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `document` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `userType` VARCHAR(191) NOT NULL,
    `balance` DECIMAL(65, 30) NOT NULL DEFAULT 0,

    UNIQUE INDEX `User_document_key`(`document`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transfer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` DECIMAL(65, 30) NOT NULL,
    `payerId` INTEGER NOT NULL,
    `payeeId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Transfer` ADD CONSTRAINT `Transfer_payerId_fkey` FOREIGN KEY (`payerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transfer` ADD CONSTRAINT `Transfer_payeeId_fkey` FOREIGN KEY (`payeeId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
