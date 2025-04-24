export default interface IEnderecoResponse {
	cep: string;
	uf: string;
	cidade: string;
	bairro: string;
	rua: string;
	numero: string;
	complemento: string | null
}
