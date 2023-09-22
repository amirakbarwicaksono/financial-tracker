package models

import (
	"time"
)

type Transaction struct {
	ID         uint
	Item       string
	Amount     float64
	Date       time.Time
	IsIncome   bool
	CategoryID uint
	Category   Category
}
