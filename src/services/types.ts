export interface CryptData {
	id: string;
	image: string;
	name: string;
	current_price: number;
	price_change_percentage_24h: number;
	total_volume: number;
}

export interface CryptoDataChart {
	prices: [number, number][]; 
	market_cap: [number, number][];
	total_volumes: [number, number][]; 
}

export interface CryptoDataPriceChart{
	timestamp: number;
	prices: number;
}

export interface CryptoDataVolumeChart{
	timestamp: number;
	volume: number;
}

export interface DialogFavoriteType {
	nameFavorite: string;
	statusFavorite: string;
	dateFavorite: number;
}
