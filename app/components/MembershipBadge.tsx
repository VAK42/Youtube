import { Crown, Star, Zap } from 'lucide-react';
type MembershipTier = 'basic' | 'gold' | 'diamond' | null;
interface MembershipBadgeProps {
  tier: MembershipTier;
  size?: 'sm' | 'md';
}
export function MembershipBadge({ tier, size = 'sm' }: MembershipBadgeProps) {
  if (!tier) return null;
  const configs = {
    basic: { icon: Star, color: 'text-gray-400', bg: 'bg-gray-500/20' },
    gold: { icon: Crown, color: 'text-yellow-500', bg: 'bg-yellow-500/20' },
    diamond: { icon: Zap, color: 'text-cyan-400', bg: 'bg-cyan-400/20' },
  };
  const config = configs[tier];
  const Icon = config.icon;
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  const padding = size === 'sm' ? 'px-1.5 py-0.5' : 'px-2 py-1';
  return (
    <span className={`inline-flex items-center gap-1 ${config.bg} ${config.color} rounded text-xs font-medium ${padding}`}>
      <Icon className={iconSize} />
      {tier.charAt(0).toUpperCase() + tier.slice(1)}
    </span>
  )
}