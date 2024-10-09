FROM node:20.15.0

# Copy your application files
COPY . /usr/src/app

# Set the working directory
WORKDIR /usr/src/app

# Install dependencies
RUN npm install

# Build bcrypt from source
RUN npm rebuild bcrypt

# Expose the port your application listens on
EXPOSE 8070

# Start your application
CMD ["npm", "run", "start:dev"]