export default interface IEnderecoRequest {
	"cep": string,
	"uf": string,
	"cidade": string,
	"bairro": string,
	"rua": string,
	"numero": string,
	"complemento": string | null
}
