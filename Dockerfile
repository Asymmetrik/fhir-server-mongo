FROM node:15.12.0-slim

# Enable apt-get to run from the new sources.
RUN printf "deb http://archive.debian.org/debian/ \
    jessie main\ndeb-src http://archive.debian.org/debian/ \
    jessie main\ndeb http://security.debian.org \
    jessie/updates main\ndeb-src http://security.debian.org \
    jessie/updates main" > /etc/apt/sources.list

# Update everything on the box
RUN apt-get -y update && apt-get -y install curl && apt-get clean

#RUN wget https://github.com/Yelp/dumb-init/releases/download/v1.2.4/dumb-init_1.2.4_amd64.deb
#RUN dpkg -i dumb-init_*.deb

# Set the working directory
WORKDIR /srv/src

# Copy our package.json & install our dependencies
COPY package.json /srv/src/package.json
COPY .snyk /srv/src/.snyk

# RUN cd /srv/src && yarn install --verbose
RUN cd /srv/src && rm --force package-lock.json && yarn install --no-optional --verbose

# Copy the remaining application code.
COPY . /srv/src

# Download the Amazon DocumentDB Certificate Authority (CA) certificate required to authenticate to your cluster
RUN curl https://s3.amazonaws.com/rds-downloads/rds-combined-ca-bundle.pem --output /srv/src/rds-combined-ca-bundle.pem

# Start the app
ENV NODE_ENV=production
CMD ["tail", "-f", "/dev/null"]
