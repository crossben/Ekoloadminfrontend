# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Production stage
FROM httpd:2.4-alpine

# Copy the build output
COPY --from=build /app/dist/ /usr/local/apache2/htdocs/

# Copy .htaccess
COPY .htaccess /usr/local/apache2/htdocs/

# Enable mod_rewrite by modifying httpd.conf
RUN sed -i \
    -e '/#LoadModule rewrite_module/s/^#//' \
    -e '/AllowOverride None/s/None/All/' \
    /usr/local/apache2/conf/httpd.conf

EXPOSE 80
