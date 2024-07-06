import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { MdEmail, MdLock } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { api } from '../../services/api';
import { ButtonCriar } from '../../components/ButtonCriar';
import { Column, Container, EsqueciText, Row, SubtitleLogin, Title, TitleLogin, Wrapper } from './styles';

const baseUrl = 'http://localhost:3000';

const schema = yup.object({
    email: yup.string().email('O e-mail não é válido').required('Campo obrigatório'),
    password: yup.string().min(3, 'Mínimo de 3 caracteres').required('Campo obrigatório'),  
  }).required();

const Login = () => {
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver:yupResolver(schema),
        mode: 'onChange',  //valida assim que usuario digitar
    });
      const onSubmit = async formData => { //sync e await para esperar resposta pq a api pode demorar
        try {
            const { data } = await api.get(`${baseUrl}/users?email=${formData.email}&senha=${formData.password}`);
            if(data.length === 1) {
                navigate('/feed')
            } else {
                alert('Email ou senha invádido')
            }
        } catch {
            alert('Ocorreu um erro, tente novamente.')
        }
      };

        const handleClickCriarConta = () => {
            navigate('/cadastro')
        }

    return ( <>  
    <Header />
    <Container>
        <Column>
            <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                 e entrar mais rápido nas empresas mais desejadas.</Title>
        </Column>
        <Column>
            <Wrapper>
                <TitleLogin>Faça seu cadastro</TitleLogin>
                <SubtitleLogin>Faça seu login e make the change.</SubtitleLogin>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input name='email' errorMessage={errors?.email?.message} control={control} placeholder='E-mail' leftIcon={<MdEmail />}/>
                    <Input name='password' control={control}  errorMessage={errors?.password?.message} placeholder='Senha' type='password' leftIcon={<MdLock />}/>
                    <Button title='Entrar' variant='secondary' type='submit' />
                </form>
                <Row>
                    <EsqueciText>Esqueci minha senha</EsqueciText>
                    <ButtonCriar title='Criar Conta' variant='secondary' onClick={handleClickCriarConta}>Criar Conta</ButtonCriar>
                </Row>
            </Wrapper>
        </Column>
    </Container>
    </>)  //brackets fechadas pq tem 2 componentes ao lado do outro
}
export { Login };