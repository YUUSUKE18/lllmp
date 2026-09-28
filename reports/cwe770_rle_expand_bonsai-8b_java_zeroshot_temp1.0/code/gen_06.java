import java.util.*;

public class Main {
    public static void main(String[] args) {
        String input = "7:3,2:2";
        String[] parts = input.split(",");
        List<Map.Entry<Integer, Integer>> elements = new ArrayList<>();

        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) continue;
            String[] valueAndCount = part.split(":");
            if (valueAndCount.length != 2) continue;
            try {
                int value = Integer.parseInt(valueAndCount[0]);
                int count = Integer.parseInt(valueAndCount[1]);
                if (count <= 0) continue;
                elements.add(new AbstractMap.SimpleEntry<>(value, count));
            } catch (NumberFormatException e) {
                continue;
            }
        }

        int count = 0;
        long sum = 0;
        for (Map.Entry<Integer, Integer> entry : elements) {
            count += entry.getValue();
            sum += entry.getKey() * entry.getValue();
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
