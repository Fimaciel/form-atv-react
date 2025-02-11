import React, { useState } from "react";

function FormCadastro() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefoneFixo, setTelefoneFixo] = useState("");
  const [celular, setCelular] = useState("");
  const [nomePai, setNomePai] = useState("");
  const [nomeMae, setNomeMae] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [infoMenorVisible, setInfoMenorVisible] = useState(false);
  const [isCpfValido, setIsCpfValido] = useState(true);
  const [isEmailValido, setIsEmailValido] = useState(true);
  const [isSenhaValida, setIsSenhaValida] = useState(true);
  const [isSenhaConfirmada, setIsSenhaConfirmada] = useState(true);

  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");

    if (cpf.length !== 11) return false;
    if (/(\d)\1{10}/.test(cpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto === 10 || resto === 11) ? 0 : resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    resto = (soma * 10) % 11;

    return resto === 10 || resto === 11 ? 0 : resto === parseInt(cpf.charAt(10));
  }

  function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  function DataNascimento(event) {
    const data = new Date(event.target.value);
    const idade = new Date().getFullYear() - data.getFullYear();
    setDataNascimento(event.target.value);
    setInfoMenorVisible(idade < 18);
  }

  function CpfChange(event) {
    const valorCpf = event.target.value;
    setCpf(valorCpf);
    setIsCpfValido(validarCPF(valorCpf));
  }

  function Email(event) {
    const valorEmail = event.target.value;
    setEmail(valorEmail);
    setIsEmailValido(validarEmail(valorEmail));
  }

  function handleSenha(event) {
    const valorSenha = event.target.value;
    setSenha(valorSenha);
    setIsSenhaValida(valorSenha.length >= 8);
  }

  function ConfirmarSenha(event) {
    setConfirmarSenha(event.target.value);
    setIsSenhaConfirmada(event.target.value === senha);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !isCpfValido ||
      !isEmailValido ||
      !isSenhaValida ||
      !isSenhaConfirmada
    ) {
      alert("Preencha corretamente todos os campos.");
    } else {
      alert("Cadastro Realizado com Sucesso!");
    }
  }

  return (
    <form id="formCadastro" onSubmit={handleSubmit}>
      <h1>Cadastro de Usuário</h1>

      <section>
        <h2>Informações Pessoais</h2>
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          required
        />

        <label htmlFor="sobrenome">Sobrenome:</label>
        <input
          type="text"
          id="sobrenome"
          name="sobrenome"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder="Sobrenome"
          required
        />

        <label htmlFor="dataNascimento">Data de Nascimento:</label>
        <input
          type="date"
          id="dataNascimento"
          name="dataNascimento"
          value={dataNascimento}
          onChange={DataNascimento}
          required
        />

        <label htmlFor="cpf">CPF:</label>
        <input
          type="text"
          id="cpf"
          name="cpf"
          value={cpf}
          onChange={CpfChange}
          placeholder="XXX.XXX.XXX-XX"
          required
        />
        {!isCpfValido && <span style={{ color: "red" }}>CPF inválido</span>}

        <label htmlFor="telefoneFixo">Telefone Fixo:</label>
        <input
          type="tel"
          id="telefoneFixo"
          name="telefoneFixo"
          value={telefoneFixo}
          onChange={(e) => setTelefoneFixo(e.target.value)}
          placeholder="(XX) XXXXX-XXXX"
          required
        />

        <label htmlFor="celular">Celular:</label>
        <input
          type="tel"
          id="celular"
          name="celular"
          value={celular}
          onChange={(e) => setCelular(e.target.value)}
          placeholder="(XX) 9XXXX-XXXX"
          required
        />
      </section>

      {infoMenorVisible && (
        <section id="infoMenor">
          <h2>Informações Complementares</h2>
          <label htmlFor="nomePai">Nome do Pai:</label>
          <input
            type="text"
            id="nomePai"
            name="nomePai"
            value={nomePai}
            onChange={(e) => setNomePai(e.target.value)}
          />

          <label htmlFor="nomeMae">Nome da Mãe:</label>
          <input
            type="text"
            id="nomeMae"
            name="nomeMae"
            value={nomeMae}
            onChange={(e) => setNomeMae(e.target.value)}
          />
        </section>
      )}

      <section>
        <h2>Endereço</h2>
        <label htmlFor="cep">CEP:</label>
        <input
          type="text"
          id="cep"
          name="cep"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          placeholder="XXXXX-XXX"
          required
        />

        <label htmlFor="endereco">Endereço:</label>
        <input
          type="text"
          id="endereco"
          name="endereco"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          required
        />

        <label htmlFor="numero">Número:</label>
        <input
          type="number"
          id="numero"
          name="numero"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          required
        />

        <label htmlFor="complemento">Complemento:</label>
        <input
          type="text"
          id="complemento"
          name="complemento"
          value={complemento}
          onChange={(e) => setComplemento(e.target.value)}
        />

        <label htmlFor="cidade">Cidade:</label>
        <input
          type="text"
          id="cidade"
          name="cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          required
        />

        <label htmlFor="estado">Estado:</label>
        <input
          type="text"
          id="estado"
          name="estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          required
        />
      </section>

      <section>
        <h2>Informações da Conta</h2>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={Email}
          required
        />
        {!isEmailValido && <span style={{ color: "red" }}>Email inválido</span>}

        <label htmlFor="senha">Senha:</label>
        <input
          type="password"
          id="senha"
          name="senha"
          value={senha}
          onChange={handleSenha}
          required
        />
        {!isSenhaValida && (
          <span style={{ color: "red" }}>A senha deve ter pelo menos 8 caracteres</span>
        )}

        <label htmlFor="confirmarSenha">Confirmar Senha:</label>
        <input
          type="password"
          id="confirmarSenha"
          name="confirmarSenha"
          value={confirmarSenha}
          onChange={ConfirmarSenha}
          required
        />
        {!isSenhaConfirmada && (
          <span style={{ color: "red" }}>As senhas não correspondem</span>
        )}
      </section>

      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default FormCadastro;
