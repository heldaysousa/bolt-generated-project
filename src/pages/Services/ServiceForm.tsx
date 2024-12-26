import React, { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
}

interface ServiceFormProps {
  service?: Service | null;
  onClose: () => void;
  onSave: () => void;
}

export function ServiceForm({ service, onClose, onSave }: ServiceFormProps) {
  const [formData, setFormData] = useState({
    name: service?.name || '',
    description: service?.description || '',
    price: service?.price || 0,
    duration: service?.duration || 30,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function validateForm() {
    const newErrors: Record<string, string> = {};

    if (!formData.name) {
      newErrors.name = 'Nome é obrigatório';
    }
    if (formData.price <= 0) {
      newErrors.price = 'Preço deve ser maior que zero';
    }
    if (formData.duration <= 0) {
      newErrors.duration = 'Duração deve ser maior que zero';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) return;

    if (service?.id) {
      const { error } = await supabase
        .from('services')
        .update(formData)
        .eq('id', service.id);

      if (error) {
        console.error('Error updating service:', error);
        return;
      }
    } else {
      const { error } = await supabase
        .from('services')
        .insert([formData]);

      if (error) {
        console.error('Error creating service:', error);
        return;
      }
    }

    onSave();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {service ? 'Editar Serviço' : 'Novo Serviço'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            error={errors.name}
          />

          <Input
            label="Descrição"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <Input
            label="Preço"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: parseFloat(e.target.value) })
            }
            error={errors.price}
          />

          <Input
            label="Duração (minutos)"
            type="number"
            min="1"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: parseInt(e.target.value) })
            }
            error={errors.duration}
          />

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {service ? 'Salvar' : 'Criar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
