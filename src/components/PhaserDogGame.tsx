import { useEffect, useRef } from 'react'
import Phaser from 'phaser'

interface PhaserDogGameProps {
  speed?: number
}

const PhaserDogGame = ({ speed = 200 }: PhaserDogGameProps) => {
  const gameRef = useRef<HTMLDivElement>(null)
  const phaserGameRef = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    if (!gameRef.current) return

    class GameScene extends Phaser.Scene {
      dog!: Phaser.GameObjects.Rectangle
      leftEye!: Phaser.GameObjects.Arc
      rightEye!: Phaser.GameObjects.Arc
      tail!: Phaser.GameObjects.Rectangle
      leftLeg!: Phaser.GameObjects.Rectangle
      rightLeg!: Phaser.GameObjects.Rectangle
      direction: number = 1
      speed: number = speed

      constructor() {
        super({ key: 'GameScene' })
      }

      create() {
        this.dog = this.add.rectangle(
          100,
          this.cameras.main.height - 30,
          60,
          40,
          0x8b4513
        )

        this.leftEye = this.add.circle(
          this.dog.x - 12,
          this.dog.y - 8,
          4,
          0x000000
        )
        this.rightEye = this.add.circle(
          this.dog.x + 12,
          this.dog.y - 8,
          4,
          0x000000
        )

        this.tail = this.add.rectangle(
          this.dog.x - 35,
          this.dog.y,
          20,
          10,
          0x654321
        )

        this.leftLeg = this.add.rectangle(
          this.dog.x - 15,
          this.dog.y + 25,
          8,
          15,
          0x654321
        )
        this.rightLeg = this.add.rectangle(
          this.dog.x + 15,
          this.dog.y + 25,
          8,
          15,
          0x654321
        )
      }

      update() {
        this.dog.x += this.direction * this.speed * (1 / 60)

        if (this.dog.x >= this.cameras.main.width - 30) {
          this.direction = -1
        } else if (this.dog.x <= 30) {
          this.direction = 1
        }

        // Cập nhật vị trí các bộ phận theo con chó
        this.leftEye.x = this.dog.x - 12
        this.rightEye.x = this.dog.x + 12
        this.tail.x = this.dog.x - 35
        this.leftLeg.x = this.dog.x - 15
        this.rightLeg.x = this.dog.x + 15
      }
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: 120,
      parent: gameRef.current,
      backgroundColor: '#87CEEB',
      scene: GameScene
    }

    phaserGameRef.current = new Phaser.Game(config)

    // Xử lý resize window
    const handleResize = () => {
      if (phaserGameRef.current) {
        phaserGameRef.current.scale.resize(window.innerWidth, 120)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true)
        phaserGameRef.current = null
      }
    }
  }, [speed])

  return (
    <div
      ref={gameRef}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100vw',
        height: '120px',
        zIndex: 1000,
        border: 'none'
      }}
    />
  )
}

export default PhaserDogGame
