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
                        sh """
                        echo "Building Docker image for ${service}..."
                        docker build -t ${DOCKER_CREDENTIALS_USR}/${service}:latest ./${service}
                        """
                    }
                }
            }
        }
        stage('Run Unit Tests') {
            steps {
                script {
                    def services = ['auth-service', 'product-service', 'order-service', 'payment-service']
                    for (service in services) {
                        sh """
                        echo "Running unit tests for ${service}..."
                        cd ${service} && npm install && npm test || { echo "Tests failed for ${service}"; exit 1; }
                        cd ..
                        """
                    }
                }
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
                    // Login to Docker Hub once before pushing the images
                    sh "docker login -u ${DOCKER_CREDENTIALS_USR} -p ${DOCKER_CREDENTIALS_PSW}"
                    def services = ['auth-service', 'product-service', 'order-service', 'payment-service']
                    for (service in services) {
                        sh """
                        echo "Pushing ${service} to Docker Hub..."
                        docker push ${DOCKER_CREDENTIALS_USR}/${service}:latest
                        """
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
