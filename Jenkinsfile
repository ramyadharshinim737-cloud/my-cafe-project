pipeline {
    agent any
    environment {
        DOCKER_HUB_USER = 'ramyadharshini'
        DOCKER_HUB_CREDS = 'docker-hub-creds'
    }
    stages {
        stage('Build & Login') {
            steps {
                script {
                    // Docker Hub-ku login panrom
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDS}", passwordVariable: 'DOCKER_HUB_PASSWORD', usernameVariable: 'DOCKER_HUB_USERNAME')]) {
                        sh "docker login -u ${DOCKER_HUB_USERNAME} -p ${DOCKER_HUB_PASSWORD}"
                        
                        // Backend Build and Push
                        sh "docker build -t ${DOCKER_HUB_USER}/cafe-backend:latest ./backend"
                        sh "docker push ${DOCKER_HUB_USER}/cafe-backend:latest"
                        
                        // Frontend Build and Push
                        sh "docker build -t ${DOCKER_HUB_USER}/cafe-frontend:latest ./frontend"
                        sh "docker push ${DOCKER_HUB_USER}/cafe-frontend:latest"
                    }
                }
            }
        }
    }
}