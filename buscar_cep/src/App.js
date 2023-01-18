import React from 'react';
import { useForm } from 'react-hook-form';

function App() {

  const {register, handleSubmit, setValue, setFocus} = useForm();

  const onSubmit = (e) => {
    console.log(e);
  }

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    console.log(cep);
    fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
      console.log(data);
      // register({ name: 'address', value: data.logradouro });
      setValue('rua', data.logradouro);
      setValue('bairro', data.bairro);
      setValue('cidade', data.localidade);
      setValue('uf', data.uf);
      setFocus('numero');
    });
  }

  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>CONSULTAR CEP</h2>
      <label>
        CEP:
        <input type="text" {...register("cep")} onBlur={checkCEP} />
      </label>
      <label>
        Rua:
        <input type="text" {...register("rua" )}/>
      </label>
      <label>
        Número:
        <input type="text" {...register("numero" )}/>
      </label>
      <label>
        Bairro:
        <input type="text" {...register("bairro" )}/>
      </label>
      <label>
        Cidade:
        <input type="text" {...register("cidade" )}/>
      </label>
      <label>
        Estado:
        <input type="text" {...register("uf" )}/>
      </label>
    </form>
  );
}

export default App;