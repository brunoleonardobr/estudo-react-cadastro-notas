import React, { Component } from "react";
import "./estilo.css";
class FormularioCadastro extends Component {
    constructor(props){
        super(props);
        this.titulo = "";
        this.texto = "";
        this.categoria = "Sem Categoria"
        this.state = {categorias:[]}
        this._novasCategorias = this._novasCategorias.bind(this);
    }

    componentDidMount(){
      this.props.categorias.inscrever(this._novasCategorias)
    }

    componentWillUnmount(){
      this.props.categorias.desinscrever(this._novasCategorias)
    }
    
    _novasCategorias(categorias){
      this.setState({...this.state,categorias});
    }

    handleMudancaTitulo(evento){
        this.titulo = evento.target.value;
    }

    handleMudancaTexto(evento){
        this.texto = evento.target.value;
    }

    criarNota(evento){
        evento.preventDefault();
        evento.stopPropagation();
        this.props.criarNota(this.titulo, this.texto, this.categoria)
    }

    _handleMudancaCategoria(evento){
      evento.stopPropagation();
      this.categoria = evento.target.value;
    }

  render() {
    return (
      <form className="form-cadastro" onSubmit={this.criarNota.bind(this)}>
        <select className="form-cadastro-input" onChange={this._handleMudancaCategoria.bind(this)}>
          <option>Sem Categoria</option>
          {this.state.categorias.map((categoria,index)=>{
            return <option key={index}>{categoria}</option>
          })}
        </select>
        <input
          type="text"
          placeholder="Título"
          className="form-cadastro_input"
          onChange={this.handleMudancaTitulo.bind(this)}
        />
        <textarea
          rows={15}
          placeholder="Escreva sua nota..."
          className="form-cadastro_input"
          onChange={this.handleMudancaTexto.bind(this)}
        />
        <button className="form-cadastro_input form-cadastro_submit">
          Criar Nota
        </button>
      </form>
    );
  }
}

export default FormularioCadastro;