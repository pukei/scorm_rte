module ScormRte
  # = ScormRte
  #
  # Generic ScormRte exception class.
  class ScormRteError < StandardError
  end

  class NoScoInstanceIdError < ScormRteError
    def message
      'Always provide a unique SCO instance ID'
    end
  end
end
