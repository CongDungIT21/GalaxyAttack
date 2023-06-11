export interface DataShip {
    readonly StartPosition: [number, number],
    readonly EndPosition: [number, number]
}

export interface DataEnemy {
    readonly EnemyType: number,
    readonly StartPosition: [number, number],
    readonly EndPosition: [number, number]
}

export enum EnemyName {
    NOENEMY = "No Enemy",
    ENEMY1 = "Enemy_1",
    ENEMY2 = "Enemy_2",
}
