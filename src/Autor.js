import React, { Component } from 'react';
import InputCustomizado from './componentes/InputCustomizado';
import PubSub from 'pubsub-js';

class FormularioAutor extends Component {

  constructor() {
    super();
    this.state = { nome: '', email: '', senha: '' };
    this.enviaForm = this.enviaForm.bind(this);
  }

  enviaForm(evento) {
    evento.preventDefault();
    PubSub.publish('adiciona-autor', { id: 3, nome: this.state.nome, email: this.state.email, senha: this.state.senha });
    PubSub.publish('atualiza-lista-autores', []);
    this.setState({ nome: '', email: '', senha: '' });
  }

  salvaAlteracao(nomeInput, evento) {
    var campoSendoAlterado = {};
    campoSendoAlterado[nomeInput] = evento.target.value;
    this.setState(campoSendoAlterado);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.enviaForm} method="post">
          <InputCustomizado id="nome" type="text" name="nome" value={this.state.nome} onChange={this.salvaAlteracao.bind(this, 'nome')} label="Nome" />
          <InputCustomizado id="email" type="email" name="email" value={this.state.email} onChange={this.salvaAlteracao.bind(this, 'email')} label="Email" />
          <InputCustomizado id="senha" type="password" name="senha" value={this.state.senha} onChange={this.salvaAlteracao.bind(this, 'senha')} label="Senha" />
          <div>
            <label></label>
            <button type="submit">Gravar</button>
          </div>
        </form>
      </div>
    );
  }
}

class TabelaAutores extends Component {

  constructor() {
    super();
    this.state = { lista: [] };
  }

  componentDidMount() {
    this.setState({ lista: [{ id: 1, nome: 'Daniel Queiroz', email: 'daniel.queiroz@softplan.com.br' }, { id: 2, nome: 'Daiane Mendonça', email: 'daiane.ddm@hotmail.com' }] });

    PubSub.subscribe('atualiza-lista-autores', function (topico) {
      this.setState({ lista: this.state.lista });
    }.bind(this));

    PubSub.subscribe('adiciona-autor', function (topico, novoAutor) {
      this.state.lista.push(novoAutor);
    }.bind(this));
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.lista.map(function (autor) {
                return (
                  <tr key={autor.id}>
                    <td>{autor.nome}</td>
                    <td>{autor.email}</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default class AutorBox extends Component {

  render() {
    return (
      <div>
        <div className="App-header">
          <h1>Cadastro de autores</h1>
        </div>
        <div className="App">
          <FormularioAutor />
          <TabelaAutores />
        </div>
      </div>
    );
  }
}