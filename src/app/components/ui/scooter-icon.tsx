import scooterBlack from '@/assets/2e4570042d2bc700417b002f71dc05be7ced86b3.png';
import scooterOrange from '@/assets/817e4945f402510b68f08802098d88f52d16254a.png';

export function ScooterIcon({ className, isActive }: { className?: string; isActive?: boolean }) {
  return (
    <img 
      src={isActive ? scooterOrange : scooterBlack}
      alt="Scooter" 
      className={className}
      style={{ width: '20px', height: '20px', objectFit: 'contain' }}
    />
  );
}