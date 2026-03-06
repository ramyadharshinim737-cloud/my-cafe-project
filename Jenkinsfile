pipeline {
    agent any
    environment {
        DOCKER_HUB_USER = 'ramyadharshini'
        DOCKER_HUB_CREDS = 'docker-hub-creds'
        // Docker Desktop daemon-ah connect panna intha line help pannum
        DOCKER_HOST = 'tcp://host.docker.internal:2375'
    }
    stages {
        stage('Build & Login') {
            steps {
                script {
                    // Docker Hub Credentials use panni login panrom
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDS}", passwordVariable: 'DOCKER_HUB_PASSWORD', usernameVariable: 'DOCKER_HUB_USERNAME')]) {
                        
                        // Login command
                        sh "docker login -u ${DOCKER_HUB_USERNAME} -p ${DOCKER_HUB_PASSWORD}"
                        
                        // Backend: Build and Push
                        echo 'Building Backend Image...'
                        sh "docker build -t ${DOCKER_HUB_USER}/cafe-backend:latest ./backend"
                        sh "docker push ${DOCKER_HUB_USER}/cafe-backend:latest"
                        
                        // Frontend: Build and Push
                        echo 'Building Frontend Image...'
                        sh "docker build -t ${DOCKER_HUB_USER}/cafe-frontend:latest ./frontend"
                        sh "docker push ${DOCKER_HUB_USER}/cafe-frontend:latest"
                    }
                }
            }
        }
    }
}