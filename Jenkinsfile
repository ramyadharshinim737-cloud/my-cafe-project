pipeline {
    agent any
    environment {
        // Inga 'm' sethu update pannunga
        DOCKER_HUB_USER = 'ramyadharshinim' 
        DOCKER_HUB_CREDS = 'docker-hub-creds'
    }
    stages {
        stage('Build & Push') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDS}", passwordVariable: 'DOCKER_HUB_PASSWORD', usernameVariable: 'DOCKER_HUB_USERNAME')]) {
                        
                        // Windows Docker Desktop connect panna intha line kandaipa irukanum
                        def dockerCmd = "export DOCKER_HOST=tcp://host.docker.internal:2375 && "

                        echo 'Logging into Docker Hub...'
                        sh "${dockerCmd} docker login -u ${DOCKER_HUB_USERNAME} -p ${DOCKER_HUB_PASSWORD}"
                        
                        echo 'Building and Pushing Backend...'
                        sh "${dockerCmd} docker build -t ${DOCKER_HUB_USER}/cafe-backend:latest ./backend"
                        sh "${dockerCmd} docker push ${DOCKER_HUB_USER}/cafe-backend:latest"
                        
                        echo 'Building and Pushing Frontend...'
                        sh "${dockerCmd} docker build -t ${DOCKER_HUB_USER}/cafe-frontend:latest ./frontend"
                        sh "${dockerCmd} docker push ${DOCKER_HUB_USER}/cafe-frontend:latest"
                    }
                }
            }
        }
    }
}