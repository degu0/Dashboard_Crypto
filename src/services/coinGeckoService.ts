import api from "./api";
import type { CryptData, CryptoDataChart } from "./types";

export const getAllCryptosData = async (): Promise<CryptData[]> => {
	try {
		const response = await api.get<CryptData[]>(
			"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
			{
				headers: {
					accept: "application/json",
					"x-cg-demo-api-key": "CG-xacJq5Vbx4Eswwsc6Re6LCNJ",
				},
			},
		);
		return response.data;
	} catch (e) {
		console.error("Erro ao buscar dados da API: ", e);
		throw e;
	}
};

export const getCryptoDataById = async (id: string): Promise<CryptData[]> => {
	try {
		const response = await api.get<CryptData[]>(
			`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${id}`,
			{
				headers: {
					accept: "application/json",
					"x-cg-demo-api-key": "CG-xacJq5Vbx4Eswwsc6Re6LCNJ",
				},
			},
		);
		return response.data;
	} catch (e) {
		console.error("Erro ao buscar dados da API: ", e);
		throw e;
	}
};

export const getCryptoGraphsDataById = async (
	id: string,
): Promise<CryptoDataChart> => {
	try {
		const response = await api.get<CryptoDataChart>(
			`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily&precision=2`,
			{
				headers: {
					accept: "application/json",
					"x-cg-demo-api-key": "CG-xacJq5Vbx4Eswwsc6Re6LCNJ",
				},
			},
		);

		return response.data;
	} catch (e) {
		console.error("Erro ao buscar dados da API: ", e);
		throw e;
	}
};

