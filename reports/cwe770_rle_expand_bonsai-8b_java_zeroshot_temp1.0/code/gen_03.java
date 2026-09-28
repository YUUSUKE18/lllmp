public class Main {
    public static void main(String[] args) {
        String input = "7:3,2:2";
        String[] parts = input.split(",");
        int count = 0, sum = 0;
        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) continue;
            String[] values = part.split(":");
            if (values.length != 2) continue;
            try {
                int value = Integer.parseInt(values[0]);
                int freq = Integer.parseInt(values[1]);
                if (freq < 0) continue;
                for (int i = 0; i < freq; i++) {
                    count++;
                    sum += value;
                }
            } catch (NumberFormatException e) {
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
