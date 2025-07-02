import { SetMetadata } from '@nestjs/common';

export const IsPublicKey = 'isPublic';

export function IsPublic() {
	return SetMetadata(IsPublicKey, true);
}
