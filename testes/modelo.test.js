const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
});

test('Testando cadastro de três respostas', () => {
  modelo.cadastrar_resposta(1, '2');
  modelo.cadastrar_resposta(1, 'Maybe 2?');
  modelo.cadastrar_resposta(2, '4');
  modelo.cadastrar_resposta(3, '6');
  const respostas1 = modelo.get_respostas(1); 
  const respostas2 = modelo.get_respostas(2); 
  const respostas3 = modelo.get_respostas(3);
  expect(respostas1.length).toBe(2); 
  expect(respostas1[0].texto).toBe('2');
  expect(respostas1[1].texto).toBe('Maybe 2?');
  expect(respostas2[0].texto).toBe('4');
  expect(respostas3[0].texto).toBe('6');

  expect(modelo.get_num_respostas(1)).toBe(2);
});

test('Testando a função get_pergunta', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_resposta(1, '2');
  const perguntas = modelo.listar_perguntas(); 
  const pergunta1 = modelo.get_pergunta(1);
  const respostas1 = modelo.get_respostas(1);
  console.log(respostas1);
  expect(pergunta1).toBe(perguntas[0].texto);
});