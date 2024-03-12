function getDadosBenchmark(IDinsert) {
    let valorID = document.getElementById('IDinsert').value;

    let xmlHttp = new XMLHttpRequest();

    //diretório do dados, presente no banco de dados do servidor da AWS
    xmlHttp.open('GET', 'https://hbfuller-project-benchmark.s3.us-east-2.amazonaws.com/dados.json')
    
    xmlHttp.onreadystatechange = () => {

        //apaga qualquer informação visivel na página antes de adicionar novas informações
        document.getElementById('divMaster').innerText = '';

//---------------------------------REQUEST DO DADOS SENDO REALIZADO---------------------------------
        if(xmlHttp.readyState == 4) {
            if(xmlHttp.status == 200) {
                let JSONID = xmlHttp.responseText;
                let objJSONID = {};
                objJSONID = JSON.parse(JSONID);
                let valorRecuperado = {}
                // Percorra os objetos do JSON
                for(let i in objJSONID){
                    valorRecuperado = objJSONID[i];

                    console.log(valorRecuperado)

                    // Compare o valor inserido com o ID presente no objeto atual
                    if(valorRecuperado.ID === valorID) {
                        //garantia de limpeza da divMaster Span
                        document.getElementById('divMaster').innerHTML = ''; 

                        let input = document.getElementById('descricao');
                        input.addEventListener('input', function() {
                            this.style.width = (this.value.length + 1) + 'ch'; // Define a largura com base no comprimento do texto
                         });

                        //Aplicação dos valores resgatados dentro de um INPUT
                        document.getElementById('descricao').value = valorRecuperado.Description;
                        document.getElementById('riskDescription').value = valorRecuperado["Risk Description"]
                        document.getElementById('status').value = valorRecuperado["Follow-Up Status"];
                        document.getElementById('causeCode').value = valorRecuperado["Cause Code"];
                        document.getElementById('hbfOrderNumber').value = valorRecuperado['HBF Order Number'];
                        document.getElementById('facilityRelated').value = valorRecuperado["Defect Location"];
                        document.getElementById('category').value = valorRecuperado.Category;
                        document.getElementById('jobFactor').value = valorRecuperado["Job Factor"];
                        document.getElementById('customerMaterial').value = valorRecuperado["Customer Material"];
                        document.getElementById('fullCustomerName').value = valorRecuperado["Full Customer Name"]; 
                        
                        //apresentação do id resgatado no console
                        //console.log('ID encontrado:', valorRecuperado);

                        //Span quando o ID for encontrado
                        let span = document.createElement('span');
                        span.textContent = 'ID ENCONTRADO';
                        span.className = 'spanAceito shadow btn-success rounded p-3';

                        let divmaster = document.getElementById('divMaster');
                        divmaster.appendChild(span);

                        return;
                    } else {

//---------------------------------PARA CASO DE NÃO ENCONTRAR ALGUMA DIV---------------------------------
                        //garantia de limpeza da divMaster Span
                        document.getElementById('divMaster').innerHTML = ''; //apaga qualquer informação visivel na página antes

//---------------------------------SPAN PARA ID NÃO ENCONTRADO---------------------------------
                        let span = document.createElement('span');
                        span.textContent = 'ID não encontrado';
                        span.className = 'spanNegado shadow btn-warning rounded p-3'

                        span.style.display = 'inline';

                        let divmaster = document.getElementById('divMaster');
                        divmaster.appendChild(span);

//---------------------------------LIMPEZA DE INPUT PARA QUANDO ID NÃO ENCONTRADO---------------------------------
                        document.getElementById('descricao').value = "DESCRIPITION";
                        document.getElementById('status').value = "STATUS";
                        document.getElementById('causeCode').value = "CAUSE CODE";
                        document.getElementById('hbfOrderNumber').value = "HBF Order Number";
                        document.getElementById('facilityRelated').value = "DEFECT LOCATION";
                        document.getElementById('category').value = "CATEGORY";
                        document.getElementById('jobFactor').value = "JOB FACTOR";
                        document.getElementById('customerMaterial').value = "CUSTOMER MATERIAL";
                        document.getElementById('fullCustomerName').value = "CUSTOMER";
                        document.getElementById('riskDescription').value = "RISK DESCRIPTION";


                        //console.log("Valor encontrado: " + valorRecuperado.ID)
                    
                    }
                    
                }

//---------------------------------PARA ERRO DE RECUPERAÇÃO DO ARQUIVO---------------------------------
            } else if(xmlHttp.status == 404) {
                window.alert('O banco de dados não foi encontrado');
                console.error('Erro 404: O arquivo não foi encontrado.');
            } else {
                console.error('Erro inesperado: ' + xmlHttp.statusText);
                window.alert('Erro inesperado: Fora do erro:404. Favor verificar qual o código de erro');
            }
        }
    }

    xmlHttp.send();
}
