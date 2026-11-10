import React from 'react';
import { Calendar, MapPin, Tag, Palette, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge';

const ItemCard = ({ item, type = 'lost' }) => {
  const isLost = type === 'lost';

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image Header with status badge */}
      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
        <img
          src={item.image || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80'}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Type Tag */}
        <div className="absolute top-3 left-3">
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm backdrop-blur-md ${
              isLost
                ? 'bg-rose-500/90 text-white'
                : 'bg-emerald-600/90 text-white'
            }`}
          >
            {isLost ? 'LOST ITEM' : 'FOUND ITEM'}
          </span>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3 shadow-sm">
          <StatusBadge status={item.status} size="xs" />
        </div>

        {/* Demo data badge */}
        {item.isDemo && (
          <div className="absolute bottom-2 left-3 bg-slate-900/60 backdrop-blur-sm text-slate-200 text-[10px] font-medium px-2 py-0.5 rounded">
            Demo Content
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Date */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="inline-flex items-center gap-1 font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
              <Tag className="w-3 h-3" />
              {item.category}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              {item.date}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-indigo-600 transition-colors line-clamp-1 mb-2">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-4">
            {item.description}
          </p>

          {/* Attributes Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs py-2.5 px-3 bg-slate-50 rounded-xl mb-4 border border-slate-100">
            <div className="flex items-center gap-1.5 text-slate-700">
              <Palette className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">
                <strong className="font-medium text-slate-500">Color:</strong> {item.color || 'N/A'}
              </span>
            </div>
            {item.brand && (
              <div className="flex items-center gap-1.5 text-slate-700">
                <span className="truncate">
                  <strong className="font-medium text-slate-500">Brand:</strong> {item.brand}
                </span>
              </div>
            )}
            <div className="col-span-2 flex items-center gap-1.5 text-slate-700 truncate">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span className="truncate">
                <strong className="font-medium text-slate-500">{isLost ? 'Lost near:' : 'Found at:'}</strong> {item.location}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <User className="w-3 h-3" />
            <span className="truncate max-w-[110px]">{item.reportedBy}</span>
          </div>
          
          <Link
            to={`/item/${type}/${item.id}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;

