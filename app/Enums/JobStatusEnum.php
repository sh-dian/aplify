<?php

namespace App\Enums;

use Spatie\Enum\Laravel\Enum;

/**
 * @method static self PENDING()
 * @method static self IN_PROGRESS()
 * @method static self COMPLETED()
 * @method static self FAILED()
 * @method static self CANCELLED()
 * @method static self OPEN()
 * @method static self CLOSED()
 */
final class JobStatusEnum extends Enum
{
    /**
     * Define the actual stored values.
     */
    protected static function values(): array
    {
        return [
            'PENDING' => 1,
            'IN_PROGRESS' => 2,
            'COMPLETED' => 3,
            'FAILED' => 4,
            'CANCELLED' => 5,
            'OPEN' => 6,
            'CLOSED' => 7,
        ];
    }

    /**
     * Provide human-readable labels.
     */
    protected static function labels(): array
    {
        return [
            'PENDING' => 'Pending',
            'IN_PROGRESS' => 'In Progress',
            'COMPLETED' => 'Completed',
            'FAILED' => 'Failed',
            'CANCELLED' => 'Cancelled',
            'OPEN' => 'Open for Applications',
            'CLOSED' => 'Applications Closed',
        ];
    }
}
