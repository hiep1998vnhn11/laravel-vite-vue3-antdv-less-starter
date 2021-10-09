<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'full_name' => $this->full_name,
            'secret' => $this->when($request->secret === '123', 'secret pass!'),
            $this->mergeWhen($request->secretMerge === '321', [
                'first-secret' => 'value',
                'second-secret' => 'value',
            ]),
            'info' => [
                'gender' => $this->info->gender ?? ''
            ],
            'post' => $this->whenLoaded('posts'),
        ];
    }
}
