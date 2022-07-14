import uuid from '$lib/utils/uuid';

export default class Identifiable {
	id: string = uuid();

	/**
	 * Check if other has id property and if it is the same as this.id
	 * @param other other object
	 * @returns if object is the same as other object occording to id
	 */
	equals(other: Identifiable) {
		return 'id' in other && this.id === other.id;
	}
}
