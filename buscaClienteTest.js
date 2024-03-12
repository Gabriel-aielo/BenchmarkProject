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
                            inputStatusCliente.value = `Status: ${statusCliente}`;
                            }                         
                            inputStatusCliente.className = 'col-md-3 m-1 rounded border';
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
