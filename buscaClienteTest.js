function atualizarDados() {
    let xmlHttp = new XMLHttpRequest();

    xmlHttp.open('GET', 'https://hbfuller-project-benchmark.s3.us-east-2.amazonaws.com/dadosCompletos.json');
    
    xmlHttp.onreadystatechange = () => {
        if(xmlHttp.readyState == 4) {
            if(xmlHttp.status == 200) {
                let JSONID = xmlHttp.responseText;
                let objJSONID = JSON.parse(JSONID);

                let nomesClientes = new Set(); // Conjunto para armazenar nomes únicos
                let clientes = {}; // Objeto para armazenar os clientes e suas informações

                //Data diária
                let dataAtual = new Date();
                let dataFormatada = `${dataAtual.getDate()}/${dataAtual.getMonth() + 1}/${dataAtual.getFullYear()}`;
//                console.log(dataFormatada);

                
                for(let i in objJSONID){
                    let valorRecuperado = objJSONID[i];
                    
                    let nomeCliente = valorRecuperado["Full Customer Name"];
                    let idCliente = valorRecuperado.ID;
                    let customerMaterial = valorRecuperado["Customer Material"]
                    let descricaoCliente = valorRecuperado.Description; // Nova variável para armazenar a descrição
                    let risk = valorRecuperado["Risk Description"];
                    let status = valorRecuperado["Follow-Up Status"];
                    let classificacao = valorRecuperado.Category;
                    let facilityRelated = valorRecuperado["Defect Location"];
                    let jobFactor = valorRecuperado["Job Factor"];
                    let hbOrder = valorRecuperado['HBF Order Number'];
                    let dataComplete = valorRecuperado['Investigation Complete Date'];
                    let invoice = valorRecuperado['Invoice Number'];
                    let data = valorRecuperado.Date;
                    let dataFechamento = valorRecuperado['Closure Date']

                    // Armazena o nome no conjunto (Set)
                    nomesClientes.add(nomeCliente);

                    // Verifica se o cliente já está no objeto clientes
                    if (!clientes[nomeCliente]) {

                        //Aqui eu tenho um objeto e estou armazenando arrays dentro de um objeto

                        // Se não estiver, cria um novo objeto para armazenar as informações do cliente
                        clientes[nomeCliente] = {
                            ids: [], // Array para armazenar os IDs do cliente
                            descricoes: [], // Array para armazenar as descrições do cliente
                            riskDescricoes: [], // Array para armazenar as descrições de risco do cliente
                            statusReclamacao: [],
                            category: [],
                            defectLocation: [],
                            fatorTrabalho: [],
                            hbFullerOrder: [],
                            finishDate: [],
                            invoiceNumber: [],
                            materialCustomer: [],
                            dataAberta: [],
                            dataFechamentoArray: [],
                        };
                    }
                
                    clientes[nomeCliente].ids.push(idCliente);
                    clientes[nomeCliente].descricoes.push(descricaoCliente);
                    clientes[nomeCliente].riskDescricoes.push(risk);
                    clientes[nomeCliente].statusReclamacao.push(status);
                    clientes[nomeCliente].category.push(classificacao);
                    clientes[nomeCliente].defectLocation.push(facilityRelated);
                    clientes[nomeCliente].fatorTrabalho.push(jobFactor);
                    clientes[nomeCliente].hbFullerOrder.push(hbOrder);
                    clientes[nomeCliente].finishDate.push(dataComplete);
                    clientes[nomeCliente].invoiceNumber.push(invoice);
                    clientes[nomeCliente].materialCustomer.push(customerMaterial);
                    clientes[nomeCliente].dataAberta.push(data);
                    clientes[nomeCliente].dataFechamentoArray.push(dataFechamento);

                }

                // Converte o conjunto de nomes de clientes em um array e ordena em ordem alfabética
                let nomesOrdenados = Array.from(nomesClientes).sort();

                // Limpa o menu de seleção antes de adicionar as opções
                document.getElementById('rodaCliente').innerHTML = '';

                // Adiciona as opções ao menu de seleção input
                nomesOrdenados.forEach(nome => {
                    let option = document.createElement('option');
                    option.textContent = nome;
                    let rodaCliente = document.getElementById('rodaCliente');
                    rodaCliente.appendChild(option);
                });

                // Adiciona um evento de escuta para o evento 'change' no elemento <select>
                document.getElementById('rodaCliente').addEventListener('change', function(evento) {
                    let valorSelecionado = evento.target.value;
                
                    let divCliente = document.getElementById('dadosCliente');
                    divCliente.innerHTML = ''; // Limpa os dados anteriores
                    
                    if (clientes[valorSelecionado]) {
                        console.log("Cliente encontrado. Os IDs e descrições dele são:");

                        // Itera sobre os IDs e descrições simultaneamente
                        for (let i = 0; i < clientes[valorSelecionado].ids.length; i++) {

                            let id = clientes[valorSelecionado].ids[i];
                            let descricao = clientes[valorSelecionado].descricoes[i];
                            let riskDescricao = clientes[valorSelecionado].riskDescricoes[i];
                            let statusCliente = clientes[valorSelecionado].statusReclamacao[i];
                            let classificacaocausa = clientes[valorSelecionado].category[i];
                            let facilityRelated = clientes[valorSelecionado].defectLocation[i];
                            let armazenandoFatorTrabalho = clientes[valorSelecionado].fatorTrabalho[i];
                            let armazenaHbFullerOrder = clientes[valorSelecionado].hbFullerOrder[i];
                            let armazenaFinishDate = clientes[valorSelecionado].finishDate[i];
                            let armazenaInvoice = clientes[valorSelecionado].invoiceNumber[i];
                            let armazenaCustomerMaterial = clientes[valorSelecionado].materialCustomer[i];
                            let armazenaDataAberturaString = clientes[valorSelecionado].dataAberta[i];
                            let armazenaDataFechamentoString = clientes[valorSelecionado].dataFechamentoArray[i];
                            
                            /*-----------------------------Tratando a data para dias corridos-----------------------------------*/
                            // Função para converter uma string de data no formato "DD/MM/YYYY" para um objeto de data
                            function converterStringParaData(dataString) {
                                // Dividindo a string em partes (dia, mês, ano)
                                let partesData = dataString.split('/');
                                // Criando um objeto de data com as partes extraídas
                                // Lembre-se de que o mês em objetos de data JavaScript é baseado em zero, então subtraímos 1 do mês
                                return new Date(partesData[2], partesData[1] - 1, partesData[0]);
                            }
                            
                            // Convertendo as strings em objetos de data
                            let convertendoDataAbertura = converterStringParaData(armazenaDataAberturaString);
                            let convertendoDataFechamento = converterStringParaData(armazenaDataFechamentoString);
                            
                            // Verificando se as datas foram criadas corretamente
                            if (isNaN(convertendoDataAbertura.getTime())) {
                                console.error("Data de abertura inválida:", armazenaDataAberturaString);
                            }
                            if (isNaN(convertendoDataFechamento.getTime())) {
                                console.error("Data de fechamento inválida:", armazenaDataFechamentoString);
                                console.log(armazenaDataFechamentoString)

                            }
                            
                            // Se as datas são válidas, calcule a diferença em dias
                            let diferencaEmDias
                            if (!isNaN(convertendoDataAbertura.getTime()) && !isNaN(convertendoDataFechamento.getTime())) {
                                // Calculando a diferença em milissegundos
                                let diferencaEmMilissegundos = convertendoDataFechamento - convertendoDataAbertura;
                            
                                // Convertendo a diferença para dias
                                diferencaEmDias = diferencaEmMilissegundos / (1000 * 3600 * 24);
                                
                            }

                           // console.log("Dias decorridos:", diferencaEmDias);
                             //   console.log(armazenaDataAberturaString)
                              //  console.log(armazenaDataFechamentoString)
                            

                            /*------------------------Bloco principal------------------------*/
                            let divBloco = document.createElement('div');
                            divBloco.className = 'cliente-bloco justify-content-center align-items-center row rounded p-3 m-3 shadow-sm border efeitoZoom';
                            divCliente.appendChild(divBloco);

                            /*------------------------ID------------------------*/
                            let inputID = document.createElement('input');
                            inputID.type = 'text';
                            if(id == ''){
                            inputID.value = `ID: N/A`;
                            } else {
                            inputID.value = `ID: ${id}`;
                            }
                            inputID.className = 'col-md-3 m-1 rounded border';
                            inputID.disabled = true;
                            divBloco.appendChild(inputID);

                            /*------------------------Descrição------------------------*/
                            let inputDescricao = document.createElement('textarea');
                            inputDescricao.type = 'text';
                            if(descricao == ''){
                            inputDescricao.value = `Descrição reclamação: N/A`;
                            } else {
                            inputDescricao.value = `Descrição reclamação: ${descricao}`;
                            }
                            inputDescricao.className = 'col-md-8 m-1 rounded border';
                            inputDescricao.disabled = true;
                            divBloco.appendChild(inputDescricao);

                            /*------------------------Descrição------------------------*/
                            let inputCustomerMaterial = document.createElement('textarea');
                            inputCustomerMaterial.type = 'text';
                            if(armazenaCustomerMaterial == ''){
                                inputCustomerMaterial.value = `Customer Material: N/A`;
                            } else {
                                inputCustomerMaterial.value = `Customer Material: ${armazenaCustomerMaterial}`;
                            }
                            inputCustomerMaterial.className = 'col-md-4 m-1 rounded border';
                            inputCustomerMaterial.disabled = true;
                            divBloco.appendChild(inputCustomerMaterial);

                            /*------------------------Risk descripition------------------------*/
                            let inputRiskDescricao = document.createElement('input');
                            inputRiskDescricao.type = 'text';
                            if(riskDescricao == ''){
                                inputRiskDescricao.value = `Risk description: N/A`;
                            } else {
                                inputRiskDescricao.value = `Risk description: ${riskDescricao}`;
                            }
                            inputRiskDescricao.className = 'col-md-3 m-1 rounded border';
                            inputRiskDescricao.disabled = true;
                            divBloco.appendChild(inputRiskDescricao);

                            /*------------------------Data final------------------------*/
                            let inputFinishDate = document.createElement('input');
                            inputFinishDate.type = 'text';
                            if(armazenaFinishDate == ''){
                                inputFinishDate.value = `Investigation Complete: N/A`;
                            } else {
                                inputFinishDate.value = `Investigation Complete: ${armazenaFinishDate}`;
                            }
                            inputFinishDate.className = 'col-md-4 m-1 rounded border';
                            inputFinishDate.disabled = true;
                            divBloco.appendChild(inputFinishDate);

                            /*------------------------HB Fuller Order------------------------*/
                            let inputHbFullerOrder = document.createElement('input');
                            inputHbFullerOrder.type = 'text';
                            if(armazenaHbFullerOrder == ''){
                                inputHbFullerOrder.value = `HB fuller Order: N/A`;
                            } else {
                                inputHbFullerOrder.value = `HB fuller Order: ${armazenaHbFullerOrder}`;
                            }
                            inputHbFullerOrder.className = 'col-md-3 m-1 rounded border';
                            inputHbFullerOrder.disabled = true;
                            divBloco.appendChild(inputHbFullerOrder);

                            /*------------------------Invoice------------------------*/
                            let inputInvoice = document.createElement('input');
                            inputInvoice.type = 'text';
                            if(armazenaInvoice == ''){
                                inputInvoice.value = `Invoice: N/A`;
                            } else {
                                inputInvoice.value = `Invoice: ${armazenaInvoice}`;
                            }
                            inputInvoice.className = 'col-md-3 m-1 rounded border';
                            inputInvoice.disabled = true;
                            divBloco.appendChild(inputInvoice);

                            /*------------------------Status Cliente------------------------*/
                            let inputStatusCliente = document.createElement('input');
                            inputStatusCliente.type = 'text';

                            if(statusCliente == ''){
                            inputStatusCliente.value = `Status: N/A`;
                            } else {
                                inputStatusCliente.value = `Status: ${statusCliente} | Dias corridos: ${diferencaEmDias}`;
                                inputStatusCliente.className = 'col-md-3 m-1 rounded border';

                                if(statusCliente == "Closed"){
                                    inputStatusCliente.classList.add('bg-success', 'text-white'); // Adiciona classe de fundo verde
                                } else if(statusCliente == "Open"){
                                    inputStatusCliente.classList.add('bg-danger', 'text-white'); // Adiciona classe de fundo verde
                                } else if(statusCliente == ''){
                                    inputStatusCliente.classList.add('bg-danger', 'text-white'); // Adiciona classe de fundo verde
                                    inputStatusCliente.value = `Status: Dado Vazio`;

                                }
                            }                         
                            inputStatusCliente.disabled = true;
                            divBloco.appendChild(inputStatusCliente);

                            /*------------------------Classificação Causa------------------------*/
                            let InputClassificacao = document.createElement('input');
                            InputClassificacao.type = 'text';
                            if(classificacaocausa == ''){
                                InputClassificacao.value = 'Classificação: N/A';
                            } else {
                                InputClassificacao.value = `Classificação: ${classificacaocausa}`;                            
                            }
                            InputClassificacao.className = 'col-md-3 m-1 rounded border';
                            InputClassificacao.disabled = true;
                            divBloco.appendChild(InputClassificacao);

                            /*------------------------Facility Related------------------------*/
                            let inputfacilityRelated = document.createElement('input');
                            inputfacilityRelated.type = 'text';
                            if(facilityRelated == ''){
                                inputfacilityRelated.value = `Cause code: N/A`;
                            } else {
                                inputfacilityRelated.value = `Cause code: ${facilityRelated}`;
                            }
                            inputfacilityRelated.className = 'col-md-4 m-1 rounded border';
                            inputfacilityRelated.disabled = true;
                            divBloco.appendChild(inputfacilityRelated);

                            /*------------------------Job Factor------------------------*/
                            let inputJobFactor = document.createElement('input');
                            inputJobFactor.type = 'text';
                            if(armazenandoFatorTrabalho == ''){
                            inputJobFactor.value = `Job Factor: N/A`;
                            } else {
                            inputJobFactor.value = `Job Factor: ${armazenandoFatorTrabalho}`;
                            }
                            inputJobFactor.className = 'col-md-3 m-1 rounded border';
                            inputJobFactor.disabled = true;
                            divBloco.appendChild(inputJobFactor);
                            
                        }
                      
                    } else {
                        console.log("Cliente não encontrado")
                    }
                });
                
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
