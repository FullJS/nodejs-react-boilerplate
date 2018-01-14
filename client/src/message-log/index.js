import { message } from 'antd';
import pt_codes from '../i18n/pt_BR_SERVER.json';
import pt_codes_client from '../i18n/pt_BR_CLIENT.json';

export const showMessageByCod = (cod) => {
	
	let msgFromJson = pt_codes[cod];
	if (!msgFromJson) {
		msgFromJson = pt_codes_client[cod];
		if (!msgFromJson) {
			msgFromJson = pt_codes_client['ERROR_DEFAULT'];
		}
	}

	switch (msgFromJson.TYPE) {
		case 'ERROR':
			message.error(msgFromJson.MSG);
			break;
		case 'INFO':
			message.info(msgFromJson.MSG);
			break;
		case 'SUCCESS':
			message.success(msgFromJson.MSG);
			break;
		default: 
			break;
	}
}

export const getServerMessageByCod = (cod) => {
	return pt_codes[cod];
}
