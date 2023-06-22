pipeline{
    agent any

    stages{
        stage('Clonar o repositório, instalar dependências!'){
            steps{
                git branch: 'main', url: 'https://github.com/alexgrocha/teste_APIRest_cy.git'
                sh 'npm install'
            }
        }
        stage('Abrir Servidor'){
            steps{
                sh 'NO_COLOR=1 npm run cy:run-ci | true'
                sh 'npm run cy:report'
            }
        }
         stage('Report'){
            steps {
                publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'mochawesome-report', reportFiles: 'report.html', reportName: 'Teste APIRest Cy - atividade 15', reportTitles: '', useWrapperFileDirectly: true])
            }
        }
    }    
}