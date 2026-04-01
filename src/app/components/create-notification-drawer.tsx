import { useState } from 'react';
import { X, Users, Calendar, Bell, Smartphone, MessageSquare, Info } from 'lucide-react';

interface CreateNotificationDrawerProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
  duplicatedFrom?: string;
}

export function CreateNotificationDrawer({ onClose, onSubmit, initialData, duplicatedFrom }: CreateNotificationDrawerProps) {
  const [notificationTitle, setNotificationTitle] = useState(initialData?.title || '');
  const [messageBody, setMessageBody] = useState(initialData?.message || '');
  const [notificationType, setNotificationType] = useState<'System' | 'Promotional'>(initialData?.type || 'System');
  const [targetType, setTargetType] = useState<'all' | 'city' | 'hub' | 'segment'>(initialData?.targetType || 'all');
  const [selectedCities, setSelectedCities] = useState<string[]>(initialData?.targetDetails?.cities || []);
  const [selectedHubs, setSelectedHubs] = useState<string[]>(initialData?.targetDetails?.hubs || []);
  const [selectedSegment, setSelectedSegment] = useState(initialData?.targetDetails?.segment || '');
  const [channels, setChannels] = useState({
    push: initialData?.channels?.push ?? true,
    sms: initialData?.channels?.sms ?? false,
    inApp: initialData?.channels?.inApp ?? true,
  });
  const [deepLink, setDeepLink] = useState(initialData?.deepLink || '');
  const [actionLabel, setActionLabel] = useState(initialData?.actionLabel || '');
  const [sendNow, setSendNow] = useState(true);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [promotionalConsent, setPromotionalConsent] = useState(initialData?.compliance?.promotionalConsent ?? true);
  const [quietHours, setQuietHours] = useState(initialData?.compliance?.quietHours ?? true);
  const [previewChannel, setPreviewChannel] = useState<'push' | 'sms' | 'inApp'>('push');

  const handleSubmit = (action: 'draft' | 'send') => {
    const data = {
      title: notificationTitle,
      message: messageBody,
      type: notificationType,
      targetType,
      targetDetails: {
        cities: selectedCities,
        hubs: selectedHubs,
        segment: selectedSegment,
      },
      channels,
      deepLink,
      actionLabel,
      sendNow: action === 'send' ? sendNow : false,
      scheduledDateTime: !sendNow ? `${scheduledDate}T${scheduledTime}` : null,
      compliance: {
        promotionalConsent,
        quietHours,
      },
      action,
    };

    onSubmit(data);
  };

  const isFormValid = () => {
    if (!notificationTitle.trim() || !messageBody.trim()) return false;
    
    if (targetType === 'city' && selectedCities.length === 0) return false;
    if (targetType === 'hub' && selectedHubs.length === 0) return false;
    if (targetType === 'segment' && !selectedSegment) return false;
    
    if (!channels.push && !channels.sms && !channels.inApp) return false;
    
    if (!sendNow && (!scheduledDate || !scheduledTime)) return false;

    return true;
  };

  const getTargetEstimate = () => {
    if (targetType === 'all') return '~15,000 users';
    if (targetType === 'city') return `~${selectedCities.length * 3000} users`;
    if (targetType === 'hub') return `~${selectedHubs.length * 500} users`;
    if (targetType === 'segment') return '~2,400 users';
    return '0 users';
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 h-full bg-white shadow-xl z-50 flex flex-col"
        style={{ width: '900px' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid #E5E7EB' }}
        >
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111111' }}>
              {duplicatedFrom ? 'Duplicate Notification' : 'Create Notification'}
            </h2>
            {duplicatedFrom && (
              <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                Duplicated from: {duplicatedFrom}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors"
            style={{ backgroundColor: 'transparent' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X className="w-5 h-5" style={{ color: '#6B7280' }} />
          </button>
        </div>

        {/* Duplication Banner */}
        {duplicatedFrom && (
          <div
            className="px-6 py-3 flex items-center gap-3"
            style={{ backgroundColor: '#DBEAFE', borderBottom: '1px solid #E5E7EB' }}
          >
            <Info className="w-4 h-4 flex-shrink-0" style={{ color: '#2563EB' }} />
            <p style={{ fontSize: '13px', color: '#1E40AF' }}>
              This is a duplicate of <strong>{duplicatedFrom}</strong>. All settings have been copied. Status has been reset to Draft.
            </p>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2">
            {/* Left - Form */}
            <div className="p-6" style={{ borderRight: '1px solid #E5E7EB' }}>
              {/* Section: Content */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#FFF1EC' }}
                  >
                    <Bell className="w-3 h-3" style={{ color: '#F24E1E' }} />
                  </div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>
                    Content
                  </h3>
                </div>
                
                <div className="mb-4">
                  <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                    Notification Title <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={notificationTitle}
                    onChange={(e) => setNotificationTitle(e.target.value)}
                    placeholder="Enter notification title..."
                    className="w-full px-3"
                    style={{
                      height: '40px',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      fontSize: '14px',
                      color: '#111111',
                    }}
                  />
                  {!notificationTitle.trim() && (
                    <p style={{ fontSize: '11px', color: '#DC2626', marginTop: '4px' }}>
                      Title is required
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                    Message Body <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <textarea
                    value={messageBody}
                    onChange={(e) => setMessageBody(e.target.value)}
                    placeholder="Enter your message here..."
                    rows={4}
                    className="w-full px-3 py-2"
                    style={{
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      fontSize: '14px',
                      color: '#111111',
                      resize: 'none',
                    }}
                  />
                  <div className="flex items-center justify-between mt-1">
                    <p style={{ fontSize: '11px', color: messageBody.length > 200 ? '#DC2626' : '#6B7280' }}>
                      {messageBody.length}/200 characters
                    </p>
                    {!messageBody.trim() && (
                      <p style={{ fontSize: '11px', color: '#DC2626' }}>
                        Message is required
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                    Notification Type <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      className="flex items-center justify-center p-3 rounded-lg cursor-pointer transition-colors"
                      style={{
                        border: `2px solid ${notificationType === 'System' ? '#2563EB' : '#E5E7EB'}`,
                        backgroundColor: notificationType === 'System' ? '#DBEAFE' : 'white',
                      }}
                    >
                      <input
                        type="radio"
                        name="type"
                        value="System"
                        checked={notificationType === 'System'}
                        onChange={() => setNotificationType('System')}
                        className="mr-2"
                        style={{ accentColor: '#2563EB' }}
                      />
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                        System
                      </span>
                    </label>
                    <label
                      className="flex items-center justify-center p-3 rounded-lg cursor-pointer transition-colors"
                      style={{
                        border: `2px solid ${notificationType === 'Promotional' ? '#F24E1E' : '#E5E7EB'}`,
                        backgroundColor: notificationType === 'Promotional' ? '#FFF1EC' : 'white',
                      }}
                    >
                      <input
                        type="radio"
                        name="type"
                        value="Promotional"
                        checked={notificationType === 'Promotional'}
                        onChange={() => setNotificationType('Promotional')}
                        className="mr-2"
                        style={{ accentColor: '#F24E1E' }}
                      />
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                        Promotional
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div style={{ height: '1px', backgroundColor: '#E5E7EB', margin: '24px 0' }} />

              {/* Section: Targeting */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#FFF1EC' }}
                  >
                    <Users className="w-3 h-3" style={{ color: '#F24E1E' }} />
                  </div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>
                    Targeting
                  </h3>
                </div>

                <div className="mb-4">
                  <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                    Target Type <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <select
                    value={targetType}
                    onChange={(e) => setTargetType(e.target.value as any)}
                    className="w-full px-3"
                    style={{
                      height: '40px',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      fontSize: '14px',
                      color: '#111111',
                    }}
                  >
                    <option value="all">All Users</option>
                    <option value="city">By City</option>
                    <option value="hub">By Hub</option>
                    <option value="segment">By Segment</option>
                  </select>
                </div>

                {targetType === 'city' && (
                  <div className="mb-4">
                    <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                      Select Cities <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <div className="space-y-2">
                      {['Bangalore', 'Delhi', 'Mumbai', 'Pune'].map((city) => (
                        <label key={city} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCities.includes(city)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCities([...selectedCities, city]);
                              } else {
                                setSelectedCities(selectedCities.filter(c => c !== city));
                              }
                            }}
                            className="w-4 h-4"
                            style={{ accentColor: '#F24E1E' }}
                          />
                          <span style={{ fontSize: '14px', color: '#111111' }}>{city}</span>
                        </label>
                      ))}
                    </div>
                    {selectedCities.length === 0 && (
                      <p style={{ fontSize: '11px', color: '#DC2626', marginTop: '4px' }}>
                        Select at least one city
                      </p>
                    )}
                  </div>
                )}

                {targetType === 'hub' && (
                  <div className="mb-4">
                    <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                      Select Hubs <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <div className="space-y-2">
                      {['MG Road Hub', 'Whitefield Hub', 'Koramangala Hub', 'Indiranagar Hub'].map((hub) => (
                        <label key={hub} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedHubs.includes(hub)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedHubs([...selectedHubs, hub]);
                              } else {
                                setSelectedHubs(selectedHubs.filter(h => h !== hub));
                              }
                            }}
                            className="w-4 h-4"
                            style={{ accentColor: '#F24E1E' }}
                          />
                          <span style={{ fontSize: '14px', color: '#111111' }}>{hub}</span>
                        </label>
                      ))}
                    </div>
                    {selectedHubs.length === 0 && (
                      <p style={{ fontSize: '11px', color: '#DC2626', marginTop: '4px' }}>
                        Select at least one hub
                      </p>
                    )}
                  </div>
                )}

                {targetType === 'segment' && (
                  <div className="mb-4">
                    <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                      User Segment <span style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <select
                      value={selectedSegment}
                      onChange={(e) => setSelectedSegment(e.target.value)}
                      className="w-full px-3"
                      style={{
                        height: '40px',
                        borderRadius: '8px',
                        border: '1px solid #E5E7EB',
                        fontSize: '14px',
                        color: '#111111',
                      }}
                    >
                      <option value="">Select segment...</option>
                      <option value="active">Active Users (Last 7 days)</option>
                      <option value="inactive">Inactive Users (30+ days)</option>
                      <option value="premium">Premium Users</option>
                      <option value="new">New Users (Last 30 days)</option>
                      <option value="payment-failed">Payment Failed</option>
                    </select>
                    {!selectedSegment && (
                      <p style={{ fontSize: '11px', color: '#DC2626', marginTop: '4px' }}>
                        Select a segment
                      </p>
                    )}
                  </div>
                )}

                <div
                  className="p-3 rounded-lg flex items-center justify-between"
                  style={{ backgroundColor: '#F7F9FC', border: '1px solid #E5E7EB' }}
                >
                  <span style={{ fontSize: '12px', color: '#6B7280' }}>
                    Target Size Estimate
                  </span>
                  <span
                    className="px-2 py-1 rounded-full"
                    style={{
                      fontSize: '12px',
                      fontWeight: '500',
                      backgroundColor: '#FFF1EC',
                      color: '#F24E1E',
                    }}
                  >
                    {getTargetEstimate()}
                  </span>
                </div>
              </div>

              <div style={{ height: '1px', backgroundColor: '#E5E7EB', margin: '24px 0' }} />

              {/* Section: Channels */}
              <div className="mb-6">
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '12px' }}>
                  Channels <span style={{ color: '#DC2626' }}>*</span>
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 rounded-lg cursor-pointer" style={{ border: '1px solid #E5E7EB' }}>
                    <input
                      type="checkbox"
                      checked={channels.push}
                      onChange={(e) => setChannels({ ...channels, push: e.target.checked })}
                      className="w-4 h-4"
                      style={{ accentColor: '#F24E1E' }}
                    />
                    <div className="flex-1">
                      <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                        Push Notification
                      </p>
                      <p style={{ fontSize: '12px', color: '#6B7280' }}>
                        Send as mobile push notification
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-lg cursor-pointer" style={{ border: '1px solid #E5E7EB' }}>
                    <input
                      type="checkbox"
                      checked={channels.sms}
                      onChange={(e) => setChannels({ ...channels, sms: e.target.checked })}
                      className="w-4 h-4"
                      style={{ accentColor: '#F24E1E' }}
                    />
                    <div className="flex-1">
                      <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                        SMS
                      </p>
                      <p style={{ fontSize: '12px', color: '#6B7280' }}>
                        Send as text message
                      </p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-lg cursor-pointer" style={{ border: '1px solid #E5E7EB' }}>
                    <input
                      type="checkbox"
                      checked={channels.inApp}
                      onChange={(e) => setChannels({ ...channels, inApp: e.target.checked })}
                      className="w-4 h-4"
                      style={{ accentColor: '#F24E1E' }}
                    />
                    <div className="flex-1">
                      <p style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                        In-App
                      </p>
                      <p style={{ fontSize: '12px', color: '#6B7280' }}>
                        Show in notification center
                      </p>
                    </div>
                  </label>
                </div>
                {!channels.push && !channels.sms && !channels.inApp && (
                  <p style={{ fontSize: '11px', color: '#DC2626', marginTop: '4px' }}>
                    Select at least one channel
                  </p>
                )}
              </div>

              <div style={{ height: '1px', backgroundColor: '#E5E7EB', margin: '24px 0' }} />

              {/* Section: Action Link */}
              <div className="mb-6">
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '12px' }}>
                  Action Link
                </h3>
                
                <div className="mb-4">
                  <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                    Deep Link
                  </label>
                  <input
                    type="text"
                    value={deepLink}
                    onChange={(e) => setDeepLink(e.target.value)}
                    placeholder="/offers/discount or https://..."
                    className="w-full px-3"
                    style={{
                      height: '40px',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      fontSize: '14px',
                      color: '#111111',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                    Action Button Label
                  </label>
                  <input
                    type="text"
                    value={actionLabel}
                    onChange={(e) => setActionLabel(e.target.value)}
                    placeholder="View Offer, Update Now, etc."
                    className="w-full px-3"
                    style={{
                      height: '40px',
                      borderRadius: '8px',
                      border: '1px solid #E5E7EB',
                      fontSize: '14px',
                      color: '#111111',
                    }}
                  />
                </div>
              </div>

              <div style={{ height: '1px', backgroundColor: '#E5E7EB', margin: '24px 0' }} />

              {/* Section: Schedule */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#FFF1EC' }}
                  >
                    <Calendar className="w-3 h-3" style={{ color: '#F24E1E' }} />
                  </div>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111' }}>
                    Schedule
                  </h3>
                </div>

                <div className="mb-4">
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      className="flex items-center justify-center p-3 rounded-lg cursor-pointer transition-colors"
                      style={{
                        border: `2px solid ${sendNow ? '#16A34A' : '#E5E7EB'}`,
                        backgroundColor: sendNow ? '#DCFCE7' : 'white',
                      }}
                    >
                      <input
                        type="radio"
                        name="schedule"
                        checked={sendNow}
                        onChange={() => setSendNow(true)}
                        className="mr-2"
                        style={{ accentColor: '#16A34A' }}
                      />
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                        Send Now
                      </span>
                    </label>
                    <label
                      className="flex items-center justify-center p-3 rounded-lg cursor-pointer transition-colors"
                      style={{
                        border: `2px solid ${!sendNow ? '#2563EB' : '#E5E7EB'}`,
                        backgroundColor: !sendNow ? '#DBEAFE' : 'white',
                      }}
                    >
                      <input
                        type="radio"
                        name="schedule"
                        checked={!sendNow}
                        onChange={() => setSendNow(false)}
                        className="mr-2"
                        style={{ accentColor: '#2563EB' }}
                      />
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#111111' }}>
                        Schedule
                      </span>
                    </label>
                  </div>
                </div>

                {!sendNow && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                        Date
                      </label>
                      <input
                        type="date"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        className="w-full px-3"
                        style={{
                          height: '40px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#111111',
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: '500', color: '#6B7280', display: 'block', marginBottom: '8px' }}>
                        Time
                      </label>
                      <input
                        type="time"
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                        className="w-full px-3"
                        style={{
                          height: '40px',
                          borderRadius: '8px',
                          border: '1px solid #E5E7EB',
                          fontSize: '14px',
                          color: '#111111',
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div style={{ height: '1px', backgroundColor: '#E5E7EB', margin: '24px 0' }} />

              {/* Section: Compliance */}
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '12px' }}>
                  Compliance
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={promotionalConsent}
                      onChange={(e) => setPromotionalConsent(e.target.checked)}
                      className="w-4 h-4"
                      style={{ accentColor: '#F24E1E' }}
                    />
                    <span style={{ fontSize: '14px', color: '#111111' }}>
                      Promotional consent required
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={quietHours}
                      onChange={(e) => setQuietHours(e.target.checked)}
                      className="w-4 h-4"
                      style={{ accentColor: '#F24E1E' }}
                    />
                    <span style={{ fontSize: '14px', color: '#111111' }}>
                      Respect quiet hours (9 PM - 9 AM)
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right - Live Preview */}
            <div className="p-6" style={{ backgroundColor: '#F7F9FC' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111111', marginBottom: '12px' }}>
                Live Preview
              </h3>

              {/* Channel Tabs */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setPreviewChannel('push')}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: previewChannel === 'push' ? '#FFF1EC' : 'white',
                    color: previewChannel === 'push' ? '#F24E1E' : '#6B7280',
                    border: `1px solid ${previewChannel === 'push' ? '#F24E1E' : '#E5E7EB'}`,
                  }}
                >
                  <Smartphone className="w-3 h-3" />
                  Push
                </button>
                <button
                  onClick={() => setPreviewChannel('sms')}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: previewChannel === 'sms' ? '#DBEAFE' : 'white',
                    color: previewChannel === 'sms' ? '#2563EB' : '#6B7280',
                    border: `1px solid ${previewChannel === 'sms' ? '#2563EB' : '#E5E7EB'}`,
                  }}
                >
                  <MessageSquare className="w-3 h-3" />
                  SMS
                </button>
                <button
                  onClick={() => setPreviewChannel('inApp')}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: previewChannel === 'inApp' ? '#FEF3C7' : 'white',
                    color: previewChannel === 'inApp' ? '#F59E0B' : '#6B7280',
                    border: `1px solid ${previewChannel === 'inApp' ? '#F59E0B' : '#E5E7EB'}`,
                  }}
                >
                  <Bell className="w-3 h-3" />
                  In-App
                </button>
              </div>

              {/* Push Preview */}
              {previewChannel === 'push' && (
                <div
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#F24E1E' }}
                    >
                      <Bell className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p style={{ fontSize: '11px', color: '#6B7280', marginBottom: '2px' }}>
                        Bhago Mobility
                      </p>
                      <p style={{ fontSize: '13px', fontWeight: '600', color: '#111111', marginBottom: '4px' }}>
                        {notificationTitle || 'Notification Title'}
                      </p>
                      <p style={{ fontSize: '12px', color: '#6B7280', lineHeight: '1.4' }}>
                        {messageBody || 'Your notification message will appear here...'}
                      </p>
                      {actionLabel && (
                        <button
                          className="mt-3 px-3 py-1 rounded text-white"
                          style={{
                            fontSize: '12px',
                            fontWeight: '500',
                            backgroundColor: '#F24E1E',
                          }}
                        >
                          {actionLabel}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* SMS Preview */}
              {previewChannel === 'sms' && (
                <div
                  className="rounded-xl p-4"
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                  }}
                >
                  <p style={{ fontSize: '11px', color: '#6B7280', marginBottom: '8px' }}>
                    From: BHAGOMOB
                  </p>
                  <p style={{ fontSize: '13px', color: '#111111', lineHeight: '1.5' }}>
                    {notificationTitle && `${notificationTitle}\n\n`}
                    {messageBody || 'Your SMS message will appear here...'}
                    {deepLink && `\n\n${deepLink}`}
                  </p>
                </div>
              )}

              {/* In-App Preview */}
              {previewChannel === 'inApp' && (
                <div
                  className="rounded-xl overflow-hidden"
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #E5E7EB',
                  }}
                >
                  <div className="p-4 flex items-start gap-3" style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: '#F7F9FC' }}
                    >
                      <Bell className="w-4 h-4" style={{ color: '#F24E1E' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p style={{ fontSize: '13px', fontWeight: '600', color: '#111111', marginBottom: '2px' }}>
                        {notificationTitle || 'Notification Title'}
                      </p>
                      <p style={{ fontSize: '12px', color: '#6B7280' }}>
                        {messageBody || 'Your in-app message will appear here...'}
                      </p>
                      <p style={{ fontSize: '11px', color: '#6B7280', marginTop: '4px' }}>
                        Just now
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="mt-6 space-y-3">
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: 'white', border: '1px solid #E5E7EB' }}
                >
                  <label style={{ fontSize: '11px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                    Type
                  </label>
                  <span
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: notificationType === 'System' ? '#DBEAFE' : '#FFF1EC',
                      color: notificationType === 'System' ? '#2563EB' : '#F24E1E',
                    }}
                  >
                    {notificationType}
                  </span>
                </div>

                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: 'white', border: '1px solid #E5E7EB' }}
                >
                  <label style={{ fontSize: '11px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                    Channels
                  </label>
                  <div className="flex flex-wrap gap-1">
                    {channels.push && (
                      <span className="px-2 py-1 rounded-full" style={{ fontSize: '10px', fontWeight: '500', backgroundColor: '#FFF1EC', color: '#F24E1E' }}>
                        Push
                      </span>
                    )}
                    {channels.sms && (
                      <span className="px-2 py-1 rounded-full" style={{ fontSize: '10px', fontWeight: '500', backgroundColor: '#DBEAFE', color: '#2563EB' }}>
                        SMS
                      </span>
                    )}
                    {channels.inApp && (
                      <span className="px-2 py-1 rounded-full" style={{ fontSize: '10px', fontWeight: '500', backgroundColor: '#FEF3C7', color: '#F59E0B' }}>
                        In-App
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: 'white', border: '1px solid #E5E7EB' }}
                >
                  <label style={{ fontSize: '11px', color: '#6B7280', display: 'block', marginBottom: '4px' }}>
                    Target Audience
                  </label>
                  <p style={{ fontSize: '13px', fontWeight: '500', color: '#111111' }}>
                    {getTargetEstimate()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-6 py-4 flex-shrink-0 flex justify-end gap-3"
          style={{ borderTop: '1px solid #E5E7EB' }}
        >
          <button
            onClick={onClose}
            className="px-4 transition-colors"
            style={{
              height: '40px',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              fontSize: '14px',
              fontWeight: '500',
              color: '#111111',
              backgroundColor: 'white',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F7F9FC'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
          >
            Cancel
          </button>
          <button
            onClick={() => handleSubmit('draft')}
            disabled={!notificationTitle.trim() || !messageBody.trim()}
            className="px-4 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              height: '40px',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              fontSize: '14px',
              fontWeight: '500',
              color: '#111111',
              backgroundColor: 'white',
            }}
            onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#F7F9FC')}
            onMouseLeave={(e) => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = 'white')}
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSubmit('send')}
            disabled={!isFormValid()}
            className="px-4 text-white transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              height: '40px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              backgroundColor: '#F24E1E',
            }}
          >
            {sendNow ? 'Send Now' : 'Schedule'}
          </button>
        </div>
      </div>
    </>
  );
}
