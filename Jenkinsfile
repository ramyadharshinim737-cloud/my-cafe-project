pipeline {
    agent any
    environment {
        DOCKER_HUB_USER = 'ramyadharshinim'
        DOCKER_HUB_CREDS = 'docker-hub-creds'
    }
    stages {
        stage('Build & Push') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDS}", passwordVariable: 'DOCKER_HUB_PASSWORD', usernameVariable: 'DOCKER_HUB_USERNAME')]) {
                        
                        // Windows Docker Desktop-ah connect panna intha host name correct!
                        def dockerCmd = "export DOCKER_HOST=tcp://host.docker.internal:2375 && "

                        sh "${dockerCmd} docker login -u ${DOCKER_HUB_USERNAME} -p ${DOCKER_HUB_PASSWORD}"
                        sh "${dockerCmd} docker build -t ${DOCKER_HUB_USER}/cafe-backend:latest ./backend"
                        sh "${dockerCmd} docker push ${DOCKER_HUB_USER}/cafe-backend:latest"
                        
                        sh "${dockerCmd} docker build -t ${DOCKER_HUB_USER}/cafe-frontend:latest ./frontend"
                        sh "${dockerCmd} docker push ${DOCKER_HUB_USER}/cafe-frontend:latest"
                    }
                }
            }
        }
    }
}