FROM php:8.3-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    curl \
    unzip \
    git \
    libzip-dev \
    libpq-dev \
    libjpeg-dev \
    libfreetype6-dev \
    && docker-php-ext-install pdo_mysql mbstring zip exif pcntl

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy existing Laravel project
COPY . .

# Install Laravel dependencies
RUN composer install

# Expose port for Laravel development server
EXPOSE 8000

# Start Laravel development server
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
