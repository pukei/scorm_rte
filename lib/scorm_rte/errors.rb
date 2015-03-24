module ScormRte
  # = ScormRte
  #
  # Generic ScormRte exception class.
  class ScormRteError < StandardError
  end

  class NoScoInstanceIdError < ScormRteError
  end
end
