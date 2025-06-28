import { MongoAbility } from '@casl/ability';

export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';
export type Subjects = 'user' | 'all';
export type AppAbility = MongoAbility<[Actions, Subjects]>;

export type Permission = {
	can: Actions;
	subject: Subjects;
};
