pipeline {
    agent any
    environment {
        DOCKER_CREDENTIALS = credentials('dockerhub') // Your Docker Hub credentials
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Kriscripts/microservices_api.git'
            }
        }
        stage('Build Docker Images') {
            steps {
                script {
                    def services = ['auth-service', 'product-service', 'order-service', 'payment-service']
                    for (service in services) {
                        sh "docker build -t ${DOCKER_CREDENTIALS_USR}/${service}:latest ./${service}"
                    }
                }
            }
        }
        stage('Run Unit Tests') {
            steps {
                echo 'Running unit tests...'
                // Add test commands, e.g., npm test
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
                    def services = ['auth-service', 'product-service', 'order-service', 'payment-service']
                    for (service in services) {
                        sh "docker login -u ${DOCKER_CREDENTIALS_USR} -p ${DOCKER_CREDENTIALS_PSW}"
                        sh "docker push ${DOCKER_CREDENTIALS_USR}/${service}:latest"
                    }
                }
            }
        }
        stage('Deploy Services') {
            steps {
                sh 'docker-compose down'
                sh 'docker-compose up -d'
            }
        }
    }
}
